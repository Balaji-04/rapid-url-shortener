const UrlModel = require('./../models/URLModel');
const catchASync = require('./../utilities/catchAsync');

const decodeKey = catchASync(async function (req, res){
    const document = await UrlModel.findOne({
        urlKey: req.params.id
     });
    if (document){
        res.status(200).redirect(document.longURL);
    }else{
        res.status(404).end("Unknown ERROR Occured!");
    }
});

module.exports = decodeKey;