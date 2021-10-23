const shortid = require('shortid');
const validUrl = require('valid-url');
const urls = require('../models/urls')
const baseUrl = 'http:localhost:5000'

module.exports.short = async (req, res) => {
    const {
        longUrl
    } = req.body 

    // check base url is valid 
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    // create the url code
    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await urls.findOne({
                longUrl
            })

            if (url) {
                res.status(200).send({
                    success: 1,
                    message: "Short URL",
                    ShortURL: url
                  });
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the urls model and saving to the DB
                url = new urls({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.status(200).send({
                    success: 1,
                    message: "Short URL Created Successfully",
                    ShortURL: url
                  });
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
}
module.exports.redirect = async (req,res)=>{
    try {
        const url = await urls.findOne({
            urlCode: req.params.surl
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json('No URL Found')
        }

    }
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
}