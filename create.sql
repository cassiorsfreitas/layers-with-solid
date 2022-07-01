drop table cf.installment;
drop table cf.transaction;
create table cf.transaction (
	code text primary key,
	amount numeric,
	number_installments integer,
	payment_method text,
	date timestamp default now()
);
create table cf.installment (
	code text references cf.transaction (code),
	number integer,
	amount numeric,
	primary key (code, number)
);
