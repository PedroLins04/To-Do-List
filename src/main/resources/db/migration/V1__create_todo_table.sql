CREATE TABLE todos
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    done        BOOLEAN      NOT NULL,
    priority    INT          NOT NULL
);
