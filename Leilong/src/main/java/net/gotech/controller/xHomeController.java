package net.gotech.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Home
 */
//@WebServlet("/Home")
public class xHomeController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public xHomeController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//new LoginLogsHistoryServices().createLoginLogsHistory(request, null, null);
		
		String  browserDetails  =   request.getHeader("User-Agent");
        String  userAgent       =   browserDetails;
        String  user            =   userAgent.toLowerCase();

        String browser = "";

         //===============Browser===========================
        if (user.contains("msie"))
        {
            String substring=userAgent.substring(userAgent.indexOf("MSIE")).split(";")[0];
            browser=substring.split(" ")[0].replace("MSIE", "IE")+"-"+substring.split(" ")[1];
        } else if (user.contains("safari") && user.contains("version"))
        {
            browser=(userAgent.substring(userAgent.indexOf("Safari")).split(" ")[0]).split("/")[0]+"-"+(userAgent.substring(userAgent.indexOf("Version")).split(" ")[0]).split("/")[1];
        } else if ( user.contains("opr") || user.contains("opera"))
        {
            if(user.contains("opera"))
                browser=(userAgent.substring(userAgent.indexOf("Opera")).split(" ")[0]).split("/")[0]+"-"+(userAgent.substring(userAgent.indexOf("Version")).split(" ")[0]).split("/")[1];
            else if(user.contains("opr"))
                browser=((userAgent.substring(userAgent.indexOf("OPR")).split(" ")[0]).replace("/", "-")).replace("OPR", "Opera");
        } else if (user.contains("chrome"))
        {
            browser=(userAgent.substring(userAgent.indexOf("Chrome")).split(" ")[0]).replace("/", "-");
        } else if ((user.indexOf("mozilla/7.0") > -1) || (user.indexOf("netscape6") != -1)  || (user.indexOf("mozilla/4.7") != -1) || (user.indexOf("mozilla/4.78") != -1) || (user.indexOf("mozilla/4.08") != -1) || (user.indexOf("mozilla/3") != -1) )
        {
            //browser=(userAgent.substring(userAgent.indexOf("MSIE")).split(" ")[0]).replace("/", "-");
            browser = "Netscape-?";

        } else if (user.contains("firefox"))
        {
            browser=(userAgent.substring(userAgent.indexOf("Firefox")).split(" ")[0]).replace("/", "-");
        } else if(user.contains("rv"))
        {
            browser="IE";
        } else
        {
            browser = "UnKnown, More-Info: "+userAgent;
        }
        
        
        
        
        String br="";
        String ver="";
        try {
        	 String [] version = browser.split("\\-");
             String [] version2 = version[1].split("\\.");
             br = version[0];
             ver = version2[0];
		} catch (Exception e) {
		}
       
        String browserVersion = br.concat(ver);
        
        if(browserVersion.equalsIgnoreCase("IE8") || browserVersion.equalsIgnoreCase("IE7") || browserVersion.equalsIgnoreCase("IE6")){
        	response.sendRedirect("BrowserController");
        }else if(br.equalsIgnoreCase("Chrome")){
        	Integer chromeVersion = 0;
        	try {
        		chromeVersion = Integer.parseInt(ver);
			} catch (Exception e) {
			}
        	if(chromeVersion <= 29){
        		response.sendRedirect("BrowserController");
        	}else{
        		request.getRequestDispatcher("/PlayerFrontend/index.jsp").forward(request, response);
        	}
        }else if(br.equalsIgnoreCase("Firefox")){
        	Integer firefoxeVersion = 0;
        	try {
        		firefoxeVersion = Integer.parseInt(ver);
			} catch (Exception e) {
			}
        	System.out.println();
        	if(firefoxeVersion <= 40){
        		response.sendRedirect("BrowserController");
        	}else{
        		request.getRequestDispatcher("/PlayerFrontend/index.jsp").forward(request, response);
        	}
        }else{
        	request.getRequestDispatcher("/PlayerFrontend/index.jsp").forward(request, response);
        }
        
	}

}
