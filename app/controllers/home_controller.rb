class HomeController < ApplicationController
  
  def home
  	
  	if user_signed_in?
  		redirect_to prayerneeds_path
  	else
  		redirect_to new_user_session_path
  	end
 
  end
 
end