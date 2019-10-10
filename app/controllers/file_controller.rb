# frozen_string_literal: true

class FileController < ApplicationController

  def new
  end

  def import
    if params[:file]
      total_rows, error_rows = ImportCsv.new(params[:file].path).import
      error_msg = error_rows.empty? ? '' : " and row #{error_rows.join(',')} are looks in correct, please check"
      flash[:notice] = "Total #{total_rows - error_rows.size - 1} row(s) inserted" + error_msg
    else
      flash[:notice] = 'Please select valid file'
    end
    redirect_to new_file_path
  end
end
