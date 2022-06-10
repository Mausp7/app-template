const config = {
    auth: {
        google: { //https://accounts.google.com/o/oauth2/v2/auth?client_id=423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&prompt=select_account&flowName=GeneralOAuthFlow
            clientId : process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/callback",
            tokenEndpoint: "https://oauth2.googleapis.com/token",
            grantType: "authorization code",
            userTokenEndpoint: null,
            userId: null
            
        },
        github: { //https://github.com/login/oauth/authorize?client_id=758b2d68f96a29a72f44&response_type=code&scope=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&prompt=select_account&flowName=GeneralOAuthFlow
            clientId : process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            redirectUri: process.env.GITHUB_CLIENT_REDIRECT_URI || "http://localhost:3000/redirect",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            grantType: "authorization code",
            userTokenEndpoint: "https://api.github.com/user",
            userId: "id"
        }
    }
};

module.exports = config;
