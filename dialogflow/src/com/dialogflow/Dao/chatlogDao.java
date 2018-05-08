package com.dialogflow.Dao;

import java.sql.Connection;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;

public class chatlogDao {

	public int insert(HttpServletRequest request) {
		int result=0;
		Connection con=null;
	
		try {
			
			con=new dbconn().getCon();
			//System.out.println(con.getCatalog());
			Statement stmt=con.createStatement();
			
			//request parameters
			String userid=request.getParameter("ip");
			String msg=request.getParameter("msg");
			String country_code=request.getParameter("country_code");
			String country_name=request.getParameter("country_name");
			String region_code=request.getParameter("region_code");
			String region_name=request.getParameter("region_name");
			String city=request.getParameter("city");
			String zip_code=request.getParameter("zip_code");
			String direction=request.getParameter("direction");
			
			 result= stmt.executeUpdate("INSERT INTO chatlog (userid,msg,country_code,country_name,region_code,region_name,city,zip_code,direction)"+ "VALUES ('"+userid+"','"+msg+"','"+country_code+"','"+country_name+"','"+region_code+"','"+region_name+"','"+city+"','"+zip_code+"','"+direction+"')");
			//'"+userid+"','"+userid+"','"+msg+"','"+country_code+"','"+country_name+"','"+region_code+"','"+region_name+"','"+city+"','"+zip_code+"','"+direction+"'
			con.close();
		} catch (Exception e) {
			System.out.println("createaccount "+e);
		}
		return result;
	}
	

}
