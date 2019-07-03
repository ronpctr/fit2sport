app.factory("trainerSrv", function($q, $http) {

    var activeTrainer = null;

    function Trainer(newTrainer) {
        this.id = newTrainer.id;
        this.firstName = newTrainer.firstName;
        this.lastName = newTrainer.lastName;
        this.nickName = newTrainer.nickName;
        this.address = newTrainer.address;
        this.city = newTrainer.city;
        this.telephoneNumber = newTrainer.telephoneNumber;
        this.email = newTrainer.email;
        this.password = newTrainer.password;
        this.profileDescription = newTrainer.profileDescription;
        this.profileImage = newTrainer.profileImage;
        // this.facebook = newTrainer.facebook;
        // this.instagram = newTrainer.instagram;
        this.trainingMoto = newTrainer.trainingMoto;
        this.trainingFields = newTrainer.trainingFields;
        this.trainingLocations = newTrainer.trainingLocations;
        this.traineesID = newTrainer.traineesID;
        this.traineesNumber = newTrainer.traineesNumber;
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