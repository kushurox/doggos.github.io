$(document).ready(function(){

    // Database stuff
    var firebaseConfig = {
        apiKey: "AIzaSyAJuotyI7pSIcAYICRqeUQNcd0YWWdQSnY",
        authDomain: "dog-website-81518.firebaseapp.com",
        projectId: "dog-website-81518",
        storageBucket: "dog-website-81518.appspot.com",
        messagingSenderId: "171904484499",
        appId: "1:171904484499:web:930d6a9f8eab8923747966",
        measurementId: "G-BVB7X57WQF"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var db = firebase.database();
    db.ref("comments/").get().then((snapshot)=>{
        if(snapshot.exists()){
            for(var key of Object.entries(snapshot.val())){

                var stars="<span class='review-star'>";
                for(var i=1; i<=key[1]["rating"]; i++){
                    stars += "<span class='fa fa-star checked'></span>"
                }
                for(var j=1; j<=(5-key[1]["rating"]); j++){
                    stars += "<span class='fa fa-star'></span>"
                }
                stars += "</span>"


                $(".comments").append(
                    '<div class="comment"><img src="static/images/avatar.png" class="comment-avatar"><h3 class="comment-title">' + key[1]['name'] + '</h3>' + '<br><h4 class="comment-email">' + key[1]['email'] + stars + '</h4><br>  \
                    <p class="comment-content">' + key[1]['review'] + '</p></div>')

            }
        }
        else{
            $(".comments").html("<span class='data-not-found'>Be the first one to leave your Review!</span>")
        }
    })

    // Data submission variables
    var rating=0, email="", name="", review="";


    // star rating click handlers
    $(".s5").click(function(){
        var i;
        rating = 5
        $(this).addClass("checked")
        for(i=5; i>=1; i--){
            $(".s"+i).addClass("checked")
        }

    })
    $(".s4").click(function(){
        var i;
        rating = 4
        $(this).addClass("checked")
        for(i=4; i>=1; i--){
            $(".s"+i).addClass("checked")
        }
        for(var j=5; j<=5; j++){
            $(".s"+j).removeClass("checked")
        }
    })
    $(".s3").click(function(){
        var i;
        rating = 3
        $(this).addClass("checked")
        for(i=3; i>=1; i--){
            $(".s"+i).addClass("checked")
        }
        for(var j=4; j<=5; j++){
            $(".s"+j).removeClass("checked")
        }
    })
    $(".s2").click(function(){
        var i;
        rating = 2
        $(this).addClass("checked")
        for(i=2; i>=1; i--){
            $(".s"+i).addClass("checked")
        }
        for(var j=3; j<=5; j++){
            $(".s"+j).removeClass("checked")
        }
    })
    $(".s1").click(function(){
        var i;
        rating = 1
        $(this).addClass("checked")
        for(i=1; i>=1; i--){
            $(".s"+i).addClass("checked")
        }
        for(var j=2; j<=5; j++){
            $(".s"+j).removeClass("checked")
        }
    })

    // submitting data
    function submit(){
        email = $('#email').val()
        name = $('#name').val()
        review = $('#review').val()
        review = review.replace(/(<([^>]+)>)/gi, "")
        name = name.replace(/(<([^>]+)>)/gi, "")
        email = email.replace(/(<([^>]+)>)/gi, "")

        if(email.length != 0 && name.length !=0 && rating!=0 && review !=0){
            // submit data
            db.ref('comments/').push({
                name: name,
                email: email,
                review: review,
                rating: rating

            })
            $(".submit-result").html("<span style='font-size: larger; color: green; margin-top: 2vh;'>Successfully Submitted!</span>")
        }else{
            $(".submit-result").html("<span style='font-size: larger; color: red; margin-top: 2vh;'>Don't leave any field empty!</span>")
        }
    }

    $("#submitreview").click(submit)
})
