package net.gotech.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionMonitoring implements HttpSessionListener {

	private int counter = 0;

	@Override
	public void sessionCreated(HttpSessionEvent se) {		
		counter++;
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		counter--;
	}

	public int getCounter() {
		return counter;
	}

	public void setCounter(int counter) {
		this.counter = counter;
	}


}
