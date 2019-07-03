app.factory("traineeSrv", function($q, $http) {

    var activeTrainee = null;

    function Trainee(newTrainee) {
        this.id = newTrainee.id;
        this.firstName = newTrainee.firstName;
        this.lastName = newTrainee.lastName;
        this.address = newTrainee.address;
        this.city = newTrainee.city;
        this.telephoneNumber = newTrainee.telephoneNumber;
        this.email = newTrainee.email;
        this.password = newTrainee.password;
        this.profileImage = newTrainee.profileImage;
        // this.facebook = newTrainee.facebook;
        // this.instagram = newTrainee.instagram;
        this.trainersID = newTrainee.trainersID;
        this.trains = newTrainee.trains;
    }


    function isLoggedIn() {
        return activeTrainer ? true : false;
    }

    // login will check if the user and password exists. If so it will update the active user 
    // variable and will return it
    function login(email, password) {
        var async = $q.defer();

        activeTrainer = null;
        $http.get("app/model/data/users.json").then(function(res) {
            var trainers = res.data;
            for (var i = 0; i < trainers.length && !activeTrainer; i++) {
                if (email === trainers[i].email && password === trainers[i].password) {
                    activeTrainer = new Trainer(trainers[i]);
                    async.resolve(activeTrainer);
                } 
            }
            if (!activeTrainer) {
                async.reject(401);
            }
        }, function(err) {
            async.reject(err);
        })

        // if (email === "nir@nir.com" && pwd === "123") {
        //     activeUser = new User({ id: 1, fname:"Nir", lname: "Channes", email: "nir@nir.com" });
        //     async.resolve(activeUser);
        // } else {
        //     async.reject(401);
        // }

        return async.promise;
    }

    function logout() {
        activeTrainer = null;
    }

    function getActiveTrainer() {
        return activeTrainer;
    }

    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveTrainer: getActiveTrainer
    }

});