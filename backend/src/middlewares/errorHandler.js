export const errorHandler = (err, req, res, next) => {
    console.error(err.stack)

    if(err.code === 11000){
        return res.error("Product name must be unique", 400);
    }

    if(err.isJoi){
        return res.error(err.details[0].message, 400);
    }

    res.error(err.message || 'Internal server error', err.status || 500);
}