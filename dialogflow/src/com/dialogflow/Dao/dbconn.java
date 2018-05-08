package com.dialogflow.Dao;



import java.sql.Connection;
import java.sql.DriverManager;

public class dbconn {
	public  Connection getCon() throws Exception {

		Connection con = null;

		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/dialogflow", "root", "");
			//System.out.println("connect " + con.getCatalog());
		} catch (Exception ex) {
			System.out.println(ex);
		}
		return con;
	}
	
	 /* public static void main(String[] args) throws Exception { getCon(); }
	 */
}
