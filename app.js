let auth0 = null;

const config = {
  domain: "dev-yfpa4glfda3h8ibf.us.auth0.com", // e.g., dev-abc123.us.auth0.com
  clientId: "6bFKsSNkEdANmEEO4GzeGOqRtZ6RWEeN",
};

const initAuth0 = async () => {
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    cacheLocation: 'localstorage',
  });

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'inline-block';
    const user = await auth0.getUser();
    console.log("Logged in as:", user.name);
  } else {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
      const user = await auth0.getUser();
      console.log("Logged in via redirect:", user.name);
    }
  }
};

window.onload = async () => {
  await initAuth0();

  document.getElementById("login").addEventListener("click", () => {
    auth0.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
  });

  document.getElementById("logout").addEventListener("click", () => {
    auth0.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  });
};
