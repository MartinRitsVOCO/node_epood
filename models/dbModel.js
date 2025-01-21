import mariadb from 'mariadb';
import credentials from '../credentials.json' with { type: 'json' };

async function getConnection() {
    try {
        // Create a new connection
        const conn = await mariadb.createConnection(credentials);

        // Print connection thread
        // console.log(`Connected! (id=${conn.threadId})`);

        // Return connection
        return conn;
    } catch (err) {
        // Print error
        console.log(err);
    }
}

export { getConnection };