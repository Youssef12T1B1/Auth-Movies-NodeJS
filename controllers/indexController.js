

module.exports.dash = async (req,res)=>{

     try {
         const movies = await Movie.find({user: req.user.id }).lean()
        res.render('dashboard', {
           name: req.user.username,
            movies
        })
    
    
    } catch (err) {
        console.log(err);
        res.render('error/404')
    }
    
}    