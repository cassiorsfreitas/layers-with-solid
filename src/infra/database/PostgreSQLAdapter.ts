import pgp from "pg-promise";
import Connection from "./Connection";

export default class PostgreSQLAdapter implements Connection {
	currentConnection: any;

	constructor () {
		this.currentConnection = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	query(statement: string, params: any): Promise<any> {
		return this.currentConnection.query(statement, params);
	}

	one(statement: string, params: any): Promise<any> {
		return this.currentConnection.one(statement, params);
	}

	close(): Promise<void> {
		return this.currentConnection.$pool.end();
	}
}
