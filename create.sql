drop table cassiorsfreitas.installment;
drop table cassiorsfreitas.transaction;
create table cassiorsfreitas.transaction (
	code text primary key,
	amount numeric,
	number_installments integer,
	payment_method text,
	date timestamp default now()
);
create table cassiorsfreitas.installment (
	code text references cassiorsfreitas.transaction (code),
	number integer,
	amount numeric,
	primary key (code, number)
);
