class PrayerneedsController < ApplicationController
  before_action :set_prayerneed, only: [:show, :edit, :update, :destroy]

  # GET /prayerneeds
  # GET /prayerneeds.json
  def index
    if params[:username]
     @user = User.where(username: params[:username]).first
     @prayerneeds = current_user.prayerneeds.paginate(:page => params[:page], :per_page => 12)
    else
     @prayerneeds = Prayerneed.paginate(:page => params[:page], :per_page => 12)
    end
  end

  # GET /prayerneeds/1
  # GET /prayerneeds/1.json
  def show
  end

  # GET /prayerneeds/new
  def new
    @prayerneed = Prayerneed.new
  end

  # GET /prayerneeds/1/edit
  def edit
    if current_user == @prayerneed.user
    else
      redirect_to prayerneeds_path
      flash[:notice] = "You can not do it!"
    end
  end

  # POST /prayerneeds
  # POST /prayerneeds.json
  def create
    @prayerneed = current_user.prayerneeds.new(prayerneed_params)
    @user = current_user
    respond_to do |format|
      if @prayerneed.save
        format.html { redirect_to @prayerneed, notice: 'Prayerneed was successfully created.' }
        format.json { render :show, status: :created, location: @prayerneed }
      else
        format.html { render :new }
        format.json { render json: @prayerneed.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /prayerneeds/1
  # PATCH/PUT /prayerneeds/1.json
  def update
   if current_user == @prayerneed.user
      respond_to do |format|
        if @prayerneed.update(prayerneed_params)
          format.html { redirect_to @prayerneed, notice: 'Prayerneed was successfully updated.' }
          format.json { render :show, status: :ok, location: @prayerneed }
        else
          format.html { render :edit }
          format.json { render json: @prayerneed.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to prayerneeds_path
      flash[:notice] = "You can not do it!"
    end
  end

  # DELETE /prayerneeds/1
  # DELETE /prayerneeds/1.json
  def destroy
   if current_user == @prayerneed.user
      @prayerneed.destroy
      respond_to do |format|
        format.html { redirect_to prayerneeds_url, notice: 'Prayerneed was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      redirect_to prayerneeds_path
      flash[:notice] = "You can not do it!"
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prayerneed
      @prayerneed = Prayerneed.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def prayerneed_params
      params.require(:prayerneed).permit(:title, :content, :answer)
    end
end
