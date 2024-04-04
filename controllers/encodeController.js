const UserModel = require('./../models/userModel');
const UrlModel = require('./../models/URLModel');
const getKey = require('./../utilities/parseLongURL');
const parseResponse = require('./../utilities/parseResponse');
const catchASync = require('./../utilities/catchAsync');

const encodeRoute = catchASync(async function (req,res) {
    const urlKey = getKey(req.body.longURL);
    const longURL = req.body.longURL;
    const auth_key = req.headers.apikey;
    //console.log(req.headers);
    if (!auth_key){
        return res.status(400).json(parseResponse("error", "API_KEY parameter missing."));
    }
    
    //check api key exists
    const checkValid = await UserModel.findOne({
        apiKey: auth_key
    });
    if( !checkValid){
        return res.status(403).json(parseResponse('error', 'API_KEY is invalid'));
    }
    // check if URL is previously in DB
    const doc = await UrlModel.findOne({
        longURL: longURL
    });
    if (doc) {
        return res.status(200).json(
            parseResponse('success',{
                shortURL: `${req.protocol}://${req.hostname}:${process.env.PORT}/${urlKey}`
            })
        );
    }
    // if it is a new link, add it to DB.
    await UrlModel.create({
        urlKey,
        longURL
    });
    res.status(200).json( parseResponse('success', {
        shortURL: `${req.protocol}://${req.hostname}:${process.env.PORT}/${urlKey}`
    }));
});


module.exports = encodeRoute;