class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, data, message = 'Created successfully') {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }

  static paginated(res, data, pagination, message = 'Success') {
    return res.status(200).json({
      success: true,
      message,
      count: data.length,
      pagination,
      data
    });
  }

  static error(res, message = 'Server Error', statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}

module.exports = ApiResponse;
