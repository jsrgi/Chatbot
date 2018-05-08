package com.dialogflow.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dialogflow.Dao.chatlogDao;

/**
 * Servlet implementation class chatlogcontroller
 */
@WebServlet("/chatlogcontroller")
public class chatlogcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int result=new chatlogDao().insert(request);
		if(result==1)
			response.getWriter().write("Created Successfully");
	}

}
