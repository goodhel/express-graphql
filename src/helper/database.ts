import mariadb from 'mariadb'
import config from '../config/app-config.json'
const pool = mariadb.createPool(config.db)

class _database {
  query = async (sql: string, params: (string | number)[]) => {
    let conn
    const stripMeta = true

    try {
      conn = await pool.getConnection()
      const res = await conn.query(sql, params)

      if (Array.isArray(res) && res.length === 0 && config.db.rejectEmpty) {
        return { code: 'EMPTY_RESULT' }
      } else {
        if (stripMeta) {
          delete res.meta
        }

        return res
      }
    } finally {
      if (conn) conn.release()
    }
  }
}

export default new _database()
