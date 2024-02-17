CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type ENUM('tutor', 'student') NOT NULL,
    KEY (type)
);

-- adduser: A stored procedure to insert into the user table. This will be exposed to the express app
DELIMITER //

CREATE PROCEDURE adduser(
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type ENUM('tutor', 'student')
)
BEGIN
    INSERT INTO users(id, username, password, type)
    VALUES (UUID(), p_username, p_password, p_type);
END//

DELIMITER ;


-- CREATE TABLE IF NOT EXISTS material