CREATE TABLE user_account (
	id SERIAL NOT NULL,
	username varchar(80) not null,
	access_token_bitrix varchar(100),
	email varchar(80) not null,
	password_account varchar(20) not null,
	created_at timestamp with time zone not null default CURRENT_TIMESTAMP,
	updated_at timestamp with time zone default CURRENT_TIMESTAMP,
	deleted_at timestamp with time zone default NULL
	PRIMARY KEY (id)
)