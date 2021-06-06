CREATE OR REPLACE VIEW PhotosWithUsersAndValoration AS
    SELECT P.*, U.username, U.avatarUrl,
        (SELECT AVG(V.value) FROM Valoration V WHERE V.photoId = P.photoId) AS score
    FROM Photos P NATURAL JOIN Users U;

CREATE OR REPLACE VIEW CommentsWithUsers AS
    SELECT C.*, U.username
    FROM Comments C NATURAL JOIN Users U;
