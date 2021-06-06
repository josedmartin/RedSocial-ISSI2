INSERT INTO Users
VALUES
	(1, 'John', 'Doe', '+01 (541) 754-3010', 'john.doe@gallery.com', 'john', 'pbkdf2:sha256:150000$KKgd0xN5$d778b27800d8b89e001843285475a0da3f6f6c664ec8e8a9590ed1c49603b194', 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'),
	(2, 'Jane', 'Smith', '+34 678 387 155', 'jane.smith@gallery.com', 'jane', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', 'https://previews.123rf.com/images/mrswilkins/mrswilkins1705/mrswilkins170500015/80934398-ilustraci%C3%B3n-de-imagen-de-perfil-mujer-vector.jpg');
-- Password = username

INSERT INTO Photos
VALUES
	(1, 'Dog', 'A very fluffy dog', '2012-05-12 18:25:43', 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/article/5f56875f5bafe8e5b93c98ad/1-yorskire-con-hojas-otono_0.jpg', 'Public', 1),
	(2, 'Iberian meat', 'A iberian meat with potatoes', '2020-01-12 13:37:01', 'https://www.hogarmania.com/archivos/201503/5538-1-presa-de-iberico-con-patatas-panadera-921-xl-668x400x80xX.jpg', 'Public', 2),
	(3, 'Piggy', 'A friendly piggy', '2019-08-24 21:20:21', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOtDEmk_CLnMGamFf6H-tvkd5ZOwXCCfZRlg&usqp=CAU', 'Public', 1),
	(4, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-02 09:16:58', 'https://cdn2.civitatis.com/espana/sevilla/guia/sevilla.jpg', 'Public', 2);
	
INSERT INTO Valoration
VALUES
	(1, '2012-05-19 01:00:05', 1, 1, 1),
	(2, '2018-07-01 20:30:00', 4, 1, 2),
	(3, '2017-01-30 03:37:49', 3, 1, 3),
	(4, '2019-11-28 15:30:00', 5, 2, 1),
	(5, '2020-10-12 19:57:03', 2, 2, 4);

INSERT INTO comments
VALUES
	(1, 'Very beautiful!!', '2018-07-01 12:56:00', 1, 2),
	(2, 'I love this city!', '2012-05-19 01:00:05', 1, 4),
	(3, 'OMG delicious', '2019-11-28 15:33:40', 2, 1),
	(4, 'A precious animal', '2020-01-01 21:35:09', 2, 3),
	(5, 'GREAT!!', '2016-07-19 03:03:40', 2, 2);

INSERT INTO category
VALUES
	(1, 'Food', 2), (2, 'Animals', 1), (3, 'Animals', 3), (4, 'Cities', 4), (5, 'Landscapes', 4);
	
INSERT INTO inappropriatewords
VALUES
	(1,'dumb'), (2, 'crap'), (3, 'shit'), (4, 'bullshit'), (5, 'damn'), (6, 'bastard'), (7, 'dumbass'), (8, 'asshole'), (9, 'fuck'), (10, 'jerk'),
	(11, 'shithead'), (12, 'I don`t give a shit'), (13, 'fuck off'), (14, 'I don’t give a fuck'), (15, 'bloody'), (16, 'numpty');
	
