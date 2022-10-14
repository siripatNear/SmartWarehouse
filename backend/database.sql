--test add user
CREATE TABLE test
(
    username character varying(40),
	first_name character varying(40),
	last_name character varying(40),
	password_hash character varying(255),

    CONSTRAINT username PRIMARY KEY (username)
);
