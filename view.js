

const root = $('#root')
const scoresArray = [];
let theUser = {};
export const loadpage = async function () {
    let topLevel = (`<nav class="level levels">
<p class="level-item level-left has-text-centered">
    <img id="editTime" src="images/Picture1.png" alt="">
</p>
<p class="level-item has-text-centered loggedInItem" style="display: none;">
  <a id="accountLoginButton" class="button is-dark openaccountModal">Account</a>
</p>
<p class="level-item has-text-centered loggedOutItem" style="display: none;">
  <a class="button is-dark opensignupModal">SignUp</a>
</p>

<p class="level-item has-text-centered loggedOutItem" style="display: none;">
  <a class="button is-dark openloginModal">Login</a>
</p>
<p class="level-item has-text-centered loggedInItem" style="display: none;">
  <a id="logoutbutton" class="button is-dark">Logout</a>
</p>
</nav><div id="leaderboard"><h1 id="leaderboard" class="title is-1">Leaderboard</h1></div>`)
    let generatedContent = (`<div class="levels" id="generatedcontent"></div>`)
    let signUpHero = (`<section class="hero is-primary" id="thehero">
<div class="hero-body" id="heronobutton">
  <p class="title has-text-centered">
    Sign In or Sign Up to view scores and play GeoWeatherGuesser!
  </p>

</div>
</section>`)
    let signupModal = (`<div id="signupModal" class="modal">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Signup Below</p>
    <button class="delete end1" aria-label="close"></button>
  </header>
  <section class="modal-card-body">
  <div class="field">
    <label class="label">Email - Must be a valid email (please)</label>
    <div class="control">
      <input id="emIn1" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" class="input" type="email" placeholder="e.g. alex@example.com">
    
      </div>
  </div>

  <div class="field">
    <label class="label">Choose Password Must be longer than 5 digits (please)</label>
    <div class="control">
      <input minlength="5" id="passIn1" class="input" type="password" placeholder="********">
    </div>
  </div>
  </section>
  <footer class="modal-card-foot">
    <button id="signupbutton" class="button is-success">Sign Up</button>
    <button class="button end1">Cancel</button>
  </footer>
</div>
</div>`)
    let loginModal = (`<div id="loginModal" class="modal">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Log In Modal!</p>
    <button class="delete end2" aria-label="close"></button>
  </header>
  <section class="modal-card-body">
  <div class="field">
    <label class="label">Email - Please Get it Right</label>
    <div class="control">
      <input id="emIn2" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" class="input" type="email" placeholder="e.g. alex@example.com">
    
      </div>
  </div>

  <div class="field">
    <label class="label">Password - Get this right as well</label>
    <div class="control">
      <input minlength="5" id="passIn2" class="input" type="password" placeholder="********">
    </div>
  </div>
  </section>
  <footer class="modal-card-foot">
    <button id="loginbutton" class="button is-success">Log In</button>
    <button class="button end2">Cancel</button>
  </footer>
</div>
</div>`)
    let tempGuessModal = (`<div id="guessModal" class="modal">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Guess the Temp Here</p>
  </header>
  <section class="modal-card-body">
  <div class="field">
    <label class="label">Input your temperature guess here:</label>
    <div class="control">
      <input type="number" id="guess" class="input" max="250" placeholder="70">
      </div>
  </div>
  </section>
  <footer class="modal-card-foot">
    <button id="theGuessButton" class="button is-success">Submit Guess</button>
  </footer>
</div>
</div>`)
    let playball = (`<div id="playball">
    <button id="playbadll" class="button is-large">Click To Play GeoWeatherGuesser</button>
    <button id="cancelGamePlay"class="button is-large is-danger" style="display:none;">Click To Cancel GamePlay</button>
    </div>`)


    let appendArray = [topLevel, generatedContent, signUpHero, signupModal, loginModal, playball, tempGuessModal]
    for (let i = 0; i < appendArray.length; i++) {
        root.append(appendArray[i])
    }

    //Loading DB Content
    let pastScores = await db.collection('userScores').orderBy('finalAverage').get()
    //console.log(pastScores.docs.length)
    for (let i = 0; i < pastScores.docs.length; i++) {
        let morecontent = generateDBcontent(pastScores.docs[i].data())
        $('#generatedcontent').append(morecontent)
    };
    //Generate loggedin/loggedout buttons

    root.on('click', '.opensignupModal', signupButtonPress)
    root.on('click', '.openloginModal', loginButtonPress)
    root.on('click', '.end1', end1ButtonPress)
    root.on('click', '.end2', end2ButtonPress)
    root.on('click', '#signupbutton', handleSignupEvent)
    root.on('click', '#loginbutton', handleLoginEvent)
    root.on('click', '#logoutbutton', handleLogoutEvent)
    root.on('click', '#playbadll', handlePlayGameEvent)
    root.on('click', '#theGuessButton', handleGuessEvent)
    root.on('click', '#accountLoginButton', handleAccountLoginEvent)
    root.on('click', '#accountModalClose', handleAccountCloseEvent)
    root.on('click', '.pressed1', handleClosingEvent1)
    root.on('click', '.pressed2', handleClosingEvent2)
    root.on('click', '#cancelGamePlay', handlecancelGPEvent)
    initMap2()
};
export const cORSerror = function (error) {
    let corsModal = (`<div id="corsModal" class="modal is-danger is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sorry about this!</p>
      </header>
      <section class="modal-card-body" >
      <img id="corsunblock" src="images/cors2.png">
      <div>Hello, you are getting the following error <br><b>"${error}"</b></div>
      <div>Please Install the CORS unblock extension to continue using the site. If you know how to install extensions, great it
      is linked below. If not, check out my youtube video about this!</div>
      <a class="centerThis" href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en">Link to the extension!</a>
      <br> 
      <a class="centerThis" href="https://youtu.be/GA0Il0E7On8">Link to my Youtube Video showing exactly how to install the extension</a>
      <div>When the extension is installed and on, simply reload - you wont see this popup anymore. <br>
      I promise I'm not a hacker. Convincing, I know, but I cant even fix a CORS error. <br>
      <b>Feel free to delete this extension after using my website or just turn it off </b> (explained in the video). If you happen
      to be a developer - Keep it! It's helpful.</div>
      </section>
      <footer class="modal-card-foot">
      </footer>
    </div>
    </div>`)
    root.append(corsModal)

}
export const handlecancelGPEvent = function () {
    document.getElementById("cancelGamePlay").style.display = 'none'
    location.reload()
}
export const handleAccountLoginEvent = function () {
    let accountLoginModal = (`<div id="accountLogin" class="modal is-active">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Account Information</p>
  </header>
  <section class="modal-card-body">
    <div>Logged an as: <strong>${theUser.email}</strong> </div>
  <footer class="modal-card-foot">
    <button id="accountModalClose" class="button is-success">Close</button>
    
  </footer>
</div>
</div>`)
    root.append(accountLoginModal)
    //document.getElementById("accountLogin").classList.add('is-active')
}
export const handleAccountCloseEvent = function () {
    $('#accountLogin').remove()
    //document.getElementById("accountLogin").classList.remove('is-active')
}
export const handlePlayGameEvent = function () {
    document.getElementById("map").style.display = 'block'
    document.getElementById("cancelGamePlay").style.display = 'inline-block'
    //mapMarker()   
}
export const initMap2 = async function () {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAikFBOvQrc38FrVMHYGj4ZsN3tQ9K1fAc&callback=initMap&libraries=&v=weekly';
    script.async = true;
    // Attach your callback function to the `window` object
    window.initMap = async function () {
        // JS API is loaded and available - Created Map
        var options = {
            zoom: 1.75,
            center: { lat: 20, lng: 0 }
        }
        const map = new google.maps.Map(document.getElementById('map'), options);
        // Random Coordinates Generator
        async function addMarker() {
            let rlatlong = await randomMarker()
            let temp = await getWeather(rlatlong.lat, rlatlong.lng)
            var marker = new google.maps.Marker({
                position: rlatlong,
                map: map,
            })
            marker.addListener('click', function () {
                guesstempModal(temp)
                marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png")

            })
        }
        for (let i = 0; i < 10; i++) {
            addMarker()
        }
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

}
export const handleClosingEvent1 = async function () {
    let avge = [offDiff(scoresArray[1], scoresArray[0]),
    offDiff(scoresArray[3], scoresArray[2]),
    offDiff(scoresArray[5], scoresArray[4]),
    offDiff(scoresArray[7], scoresArray[6]),
    offDiff(scoresArray[9], scoresArray[8]),
    offDiff(scoresArray[11], scoresArray[10]),
    offDiff(scoresArray[13], scoresArray[12]),
    offDiff(scoresArray[15], scoresArray[14]),
    offDiff(scoresArray[17], scoresArray[16]),
    offDiff(scoresArray[19], scoresArray[18])]
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    let resultofaverage = average(avge)
    let dbdata = {
        finalAverage: resultofaverage,
        name: theUser.email,
        round1: offDiff(scoresArray[1], scoresArray[0]),
        round2: offDiff(scoresArray[3], scoresArray[2]),
        round3: offDiff(scoresArray[5], scoresArray[4]),
        round4: offDiff(scoresArray[7], scoresArray[6]),
        round5: offDiff(scoresArray[9], scoresArray[8]),
        round6: offDiff(scoresArray[11], scoresArray[10]),
        round7: offDiff(scoresArray[13], scoresArray[12]),
        round8: offDiff(scoresArray[15], scoresArray[14]),
        round9: offDiff(scoresArray[17], scoresArray[16]),
        round10: offDiff(scoresArray[19], scoresArray[18]),
        time: new Date()
    }
    await db.collection('userScores').add(dbdata)
    document.getElementById("cancelGamePlay").style.display = 'none'

    location.reload()
}
export const handleClosingEvent2 = async function () {

    document.getElementById("cancelGamePlay").style.display = 'none'

    location.reload()
}
export const handleGuessEvent = function () {
    let theGuess = document.getElementById("guess").value
    //percentDiff(theGuess, temp)
    document.getElementById("guessModal").classList.remove('is-active')
    document.getElementById("guess").value = ""
    //console.log("Guess: " + theGuess)
    scoresArray.push(Number(theGuess).toFixed(0))
    console.log(scoresArray.length)
    if (scoresArray.length == 20) {
        document.getElementById("map").classList.add('blur')
        finishingUP()
    }
}
export const finishingUP = function () {
    let avge2 = [offDiff(scoresArray[1], scoresArray[0]),
    offDiff(scoresArray[3], scoresArray[2]),
    offDiff(scoresArray[5], scoresArray[4]),
    offDiff(scoresArray[7], scoresArray[6]),
    offDiff(scoresArray[9], scoresArray[8]),
    offDiff(scoresArray[11], scoresArray[10]),
    offDiff(scoresArray[13], scoresArray[12]),
    offDiff(scoresArray[15], scoresArray[14]),
    offDiff(scoresArray[17], scoresArray[16]),
    offDiff(scoresArray[19], scoresArray[18])]
    const average2 = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    let resultofaverage2 = average2(avge2)
    let postScoreModal = (`<div id="postScore" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">You think you're at the top?</p>
      </header>
      <section class="modal-card-body">
        <div id="scorePoster">
            <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src="images/sunshine.jpg">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>${theUser.email}</strong>
                      </p>
                      <div class="columns">
                        <div class="column">${offDiff(scoresArray[1], scoresArray[0])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[3], scoresArray[2])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[5], scoresArray[4])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[7], scoresArray[6])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[9], scoresArray[8])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[11], scoresArray[10])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[13], scoresArray[12])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[15], scoresArray[14])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[17], scoresArray[16])}\u00B0</div>
                        <div class="column">${offDiff(scoresArray[19], scoresArray[18])}\u00B0</div>
                        <div class="column is-one-fifth yurt">${resultofaverage2}\u00B0</div>
                      </div>
                  </div>
                </div>
              </article>
            </div>
      
      <footer class="modal-card-foot">
        <button id="postButton" class="button is-success pressed1">Post Score</button>
        <button class="button end2 pressed2">Don't Post</button>
      </footer>
    </div>
</div>`)
    root.append(postScoreModal)
    console.log(scoresArray)

}
export const guesstempModal = function (temp) {
    document.getElementById("guessModal").classList.add('is-active')
    //console.log(`Temp for that tag is: ${temp}`)
    scoresArray.push(temp.toFixed(0))

}
export const offDiff = function (theGuess, temp) {
    let off = theGuess - temp
    if (off < 0) {
        off = off * -1;
    }
    return off

}
export const generateDBcontent = function (obj) {
    //console.log(obj.time)
    var s = new Date(obj.time.seconds * 1000).toLocaleDateString("en-US")
    var t = new Date(obj.time.seconds * 1000).toLocaleTimeString("en-US")

    let userContent = (`<div id="scorePoster">
    <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="images/sunshine.jpg">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>${obj.name}'s Score</strong> from <small>${s}</small> at <small>${t}</small>
              </p>
              <div class="columns">
                <div class="column">1: ${obj.round1}\u00B0</div>
                <div class="column">2: ${obj.round2}\u00B0</div>
                <div class="column">3: ${obj.round3}\u00B0</div>
                <div class="column">4: ${obj.round4}\u00B0</div>
                <div class="column">5: ${obj.round5}\u00B0</div>
                <div class="column">6: ${obj.round6}\u00B0</div>
                <div class="column">7: ${obj.round7}\u00B0</div>
                <div class="column">8: ${obj.round8}\u00B0</div>
                <div class="column">9: ${obj.round9}\u00B0</div>
                <div class="column">10: ${obj.round10}\u00B0</div>
                <div class="column is-one-fifth yurt"><strong>Average Score: ${obj.finalAverage}\u00B0 off</strong></div>
              </div>
          </div>
        </div>
      </article>
    </div>`)
    return userContent
}
export const signupButtonPress = async function () {
    document.getElementById("signupModal").classList.add('is-active')
}
export const loginButtonPress = async function () {
    document.getElementById("loginModal").classList.add('is-active')
}
export const end1ButtonPress = async function () {
    let theModal = document.getElementById("signupModal")
    theModal.classList.remove('is-active')
    document.getElementById("emIn1").value = ""
    document.getElementById("passIn1").value = ""
}
export const end2ButtonPress = async function () {
    let theModal = document.getElementById("loginModal")
    theModal.classList.remove('is-active')
    document.getElementById("emIn2").value = ""
    document.getElementById("passIn2").value = ""
}
export const toggelInOut = async function (user) {
    let loggedOut = document.querySelectorAll('.loggedOutItem');
    let loggedIn = document.querySelectorAll('.loggedInItem');
    if (user) {
        loggedIn.forEach(button => button.style.display = 'block')
        loggedOut.forEach(button => button.style.display = 'none')
        document.getElementById("playball").style.display = 'block'
        document.getElementById("thehero").style.display = 'none'
    } else {
        loggedIn.forEach(button => button.style.display = 'none')
        loggedOut.forEach(button => button.style.display = 'block')
        document.getElementById("playball").style.display = 'none'
        document.getElementById("thehero").style.display = 'block'

    }
}
export async function randomMarker() {
    const result = await axios({
        method: 'get',
        url: `https://api.3geonames.org/?randomland=yes&json=1`
    }).then().catch(error => {
        cORSerror(error.message)
        //console.log(error.message)
    })
    let lattty = result.data.nearest.latt;
    let long = result.data.nearest.longt;
    let answer = { lat: Number(lattty), lng: Number(long) }
    return answer
};
export async function getWeather(lattytude, longytude) {
    const result = await axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lattytude}&lon=${longytude}&appid=832b0e772d22da2b61c5171829eca009`,
    });
    let answer = (result.data.main.temp - 273.15) * 9 / 5 + 32;
    return answer
};
//Authentication Stuff
//Authentication Status Tracker
auth.onAuthStateChanged(user => {
    toggelInOut(user)
    if (user) {
        document.getElementById("generatedcontent").classList.remove('blur')
        theUser = user;
    } else {
        document.getElementById("generatedcontent").classList.add('blur')
        document.getElementById("map").style.display = 'none'
        theUser = {};
    }
});
//Signing a User Up
export const handleSignupEvent = async function () {
    const email1 = document.getElementById("emIn1").value
    const password1 = document.getElementById("passIn1").value
    document.getElementById("emIn1").value = ""
    document.getElementById("passIn1").value = ""
    document.getElementById("signupModal").classList.remove('is-active')
    let newUser = await auth.createUserWithEmailAndPassword(email1, password1)
    console.log(newUser.user)
}
export const handleLoginEvent = async function () {
    const email2 = document.getElementById("emIn2").value
    const password2 = document.getElementById("passIn2").value
    document.getElementById("emIn2").value = ""
    document.getElementById("passIn2").value = ""
    document.getElementById("loginModal").classList.remove('is-active')
    let notnewUser = await auth.signInWithEmailAndPassword(email2, password2)
    //console.log(notnewUser.user)
}
//Logging a User Out
export const handleLogoutEvent = async function () {
    let signedout = await auth.signOut()
    //console.log("Signed Out")
}
$(function () {
    loadpage();

});