    
/*RN-C01 Limitación en el número de fotos*/
DELIMITER //
CREATE OR REPLACE TRIGGER numPhotosUser
BEFORE INSERT ON photos FOR EACH ROW
BEGIN
  DECLARE contador INT DEFAULT 0;
  Set contador = (SELECT COUNT(*) FROM photos WHERE userId = NEW.userId);
  
  IF (contador >= 50) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can´t upload more than 50 photos';
  END IF;
END //
DELIMITER ;

/* RN-C02: Lenguaje inapropiado en título y descripción (insertar y actualizar) */
DELIMITER //
CREATE OR REPLACE TRIGGER triggerInsertCheckBadWordsTitleAndDescription
    BEFORE Insert ON Photos FOR EACH ROW
    BEGIN
      DECLARE titleCounter INT DEFAULT 0;
      DECLARE titleDescription INT DEFAULT 0;
      DECLARE palabrota VARCHAR(25);

      DECLARE done BOOLEAN DEFAULT FALSE;
      DECLARE curPalabrotas CURSOR FOR SELECT words FROM InappropriateWords;
      DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;

      OPEN curPalabrotas;
      readLoop:LOOP
              FETCH curPalabrotas INTO palabrota;
              IF done THEN
              LEAVE readLoop;
              END IF;

              IF new.title LIKE CONCAT('%', palabrota, '%')  THEN
                SET titleCounter = titleCounter + 1; 
              END IF;

              IF new.description LIKE CONCAT('%', palabrota, '%') THEN
                SET titleDescription = titleDescription + 1;
              END IF;
      END LOOP;
      CLOSE curPalabrotas;

      IF(titleCounter > 0 OR titleDescription > 0) THEN
          SIGNAL SQLSTATE '45000' SET message_text = 'Please, delete the innapropiated words.';
      END IF;
END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER triggerUpdateCheckBadWordsTitleAndDescription
    BEFORE Update ON Photos FOR EACH ROW
    BEGIN
      DECLARE titleCounter INT DEFAULT 0;
      DECLARE titleDescription INT DEFAULT 0;
      DECLARE palabrota VARCHAR(25);

      DECLARE done BOOLEAN DEFAULT FALSE;
      DECLARE curPalabrotas CURSOR FOR SELECT words FROM InappropriateWords;
      DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;

      OPEN curPalabrotas;
      readLoop:LOOP
              FETCH curPalabrotas INTO palabrota;
              IF done THEN
              LEAVE readLoop;
              END IF;

              IF new.title LIKE CONCAT('%', palabrota, '%')  THEN
                SET titleCounter = titleCounter + 1; 
              END IF;

              IF new.description LIKE CONCAT('%', palabrota, '%') THEN
                SET titleDescription = titleDescription + 1;
              END IF;
      END LOOP;
      CLOSE curPalabrotas;

      IF(titleCounter > 0 OR titleDescription > 0) THEN
          SIGNAL SQLSTATE '45000' SET message_text = 'Please, delete the innapropiated words.';
      END IF;
END//
DELIMITER ;


/*RN-C03 Unicidad de cuentas*/
DELIMITER // 
CREATE OR REPLACE TRIGGER triggerUniqueUsernameAndEmail
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  DECLARE contadorUsuario INT DEFAULT 0;
  DECLARE contadorEmail INT DEFAULT 0;
  SET contadorUsuario = (SELECT COUNT(*) FROM users WHERE username = new.username);
  SET contadorEmail = (SELECT COUNT(*) FROM users WHERE email = new.email);
  
  IF ( contadorUsuario > 0 AND contadorEmail > 0) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'There are alredy exists that username and email';
  END IF;
  
  IF ( contadorUsuario > 0 ) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'There are alredy exists that username';
  END IF;
  
  IF ( contadorEmail > 0 ) then
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'There are alredy exists that email';
  END IF;
END //
DELIMITER ;


/*RN-C04 Limitación de valoraciones*/
DELIMITER // 
CREATE OR REPLACE TRIGGER  triggerOneValorationByUser
BEFORE INSERT ON valoration
FOR EACH ROW
BEGIN
  DECLARE contador INT DEFAULT 0;
  
  SET contador = (SELECT COUNT(*) FROM valoration WHERE userId = new.userId AND photoId = new.photoId);
  
  IF ( contador > 0 ) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'You only can´t valorate this photo one time';
  END IF;
END //
DELIMITER ;

/*RN-B05 Eliminación de fotos*/
DELIMITER // 
CREATE OR REPLACE TRIGGER  triggerDeletePhotosWithComments
BEFORE DELETE ON Photos
FOR EACH ROW
BEGIN
  DECLARE contador INT DEFAULT 0;
  
  SET contador = (SELECT COUNT(*) FROM comments WHERE photoId = old.photoId);
  
  IF ( contador > 0 ) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'You can´t delete a photo with comments';
  END IF;
END //
DELIMITER ;

DELIMITER // 
CREATE OR REPLACE TRIGGER  triggerChangeVisibilityWithComments
BEFORE Update ON Photos
FOR EACH ROW
BEGIN
  DECLARE contador INT DEFAULT 0;
  
  SET contador = (SELECT COUNT(*) FROM comments WHERE photoId = new.photoId);
  
  IF ( new.visibility = 'Private' AND contador > 0 ) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'You can´t put Private a photo with comments';
  END IF;
END //
DELIMITER ;

/*RN-B06 Unicidad de categorías*/
DELIMITER // 
CREATE OR REPLACE TRIGGER triggerUniqueCategory
BEFORE INSERT ON category
FOR EACH ROW
BEGIN
  DECLARE contador INT DEFAULT 0;
  
  SET contador = (SELECT COUNT(*) FROM category WHERE categoryName = new.categoryName AND photoId = new.photoId);
  
  IF ( contador > 0) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
    'There are alredy exists that category for this photo';
  END IF;
END //
DELIMITER ;

/*RN-B07: Uso de lenguaje adecuado en los comentarios*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerCheckCommentaryWords
    BEFORE INSERT ON comments FOR EACH ROW
    BEGIN
    DECLARE palabrota VARCHAR(25);
    DECLARE contadorComentarios INT DEFAULT 0;

    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE curPalabrotas CURSOR FOR SELECT words FROM InappropriateWords;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;

    OPEN curPalabrotas;
    readLoop:LOOP
            FETCH curPalabrotas INTO palabrota;
            IF done THEN
            LEAVE readLoop;
            END IF;

            IF new.commentText LIKE CONCAT('%', palabrota, '%') THEN
              SET contadorComentarios = contadorComentarios + 1; 
            END IF;

    END LOOP;
    CLOSE curPalabrotas;

    IF(contadorComentarios > 0) THEN
        SIGNAL SQLSTATE '45000' SET message_text = 'Please, delete the innapropiated words.';
    END IF;
END//
DELIMITER ;