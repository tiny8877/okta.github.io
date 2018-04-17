---
layout: docs_page
title: Setting Up for Okta API Integration Examples
excerpt: Set up an Okta org to use the API integration examples in the Okta API Center
---
# Setting Up for Okta API Integration Examples

Okta provides a set of API integration examples in the [Okta API Center](http://okta-api-am.herokuapp.com/).

Use the following instructions to set up a Okt org to use any of the examples in the Okta API Center.

## Prerequisites

Before you can set up an Okta org, ensure the following prerequisites are met:

* You have access to a Super Admin account in an Okta org with API Access Management enabled.
To enable this feature, {{site.contact_support_lc}}.

* You have access to a web application that can accept inbound requests such as `localhost`.

## Set Up Your Okta Org

For all the example integrations in the Okta API center, users try to access a resource on a target resource server.
Users must have a scope of `http://myapp.com/scp/silver` to access the endpoint `/planets` on the target server,
and the scope `http://myapp.com/scp/gold` to access the endpoint `/moons` on the target server.

These instructions help you set up the `planets` path. You can add the `/moons` path using the same instructions.

1. Create a group called `silverSubscribers`. Users in this group will have access to the `/planets` endpoint.
2. Add at least one user to the group.
3. Set up a Custom Authorization Server:
    a. Follow the instructions in Okta's [Authetication Guide](/authentication-guide/implementing-authentication/set-up-authz-server)
    to set up a Custom Authorization Server if don't have one already.
    b. Create a custom scope called `http://myapp.com/scp/silver`.
    c. Create an Access Policy with a rule that includes the `silver` scope for members of the `silverSubscribers` group.
    You can leave the rule assigned to all clients, however, in production the recommended practice is to include
    only the relevant clients. Select the `authorization code` and `implicit` grant types.

    {% img rule-api-center.png alt:"Values for authentication server rule for access policy" width:"800px" %}
4. Set up an OIDC client
Follow the instructions here to set up an OIDC client. For “allowed grant types”, select “Authorization Code” and “Implicit (Hybrid)” and allow the ID Token and the Access Token with Implicit grant type.
You can add your web app’s URL as a login redirect URI at this point, or you can put in a placeholder and come back and add it later.
Note: not whitelisting the redirect uri for your app is probably the most common error in these flows.
Assign the OIDC client to the silverSubscribers group. Or, you can just give access to the Everyone group.


Test your client and authorization server. Use the following URL to test your OIDC client and authorization server.

Note: in a production environment you should use the authorization code flow where possible instead of the implicit flow shown here. And, you should use actual values for the nonce and state values; see the Okta docs for reference.

Example, with actual values:
 
https://partnerpoc.oktapreview.com/oauth2/ausce8ii5wBzd0zvQ0h7/v1/authorize?response_type=token id_token&client_id=0oackbggxnLe1jjl00h7&redirect_uri=http://localhost:3090/apigee&state=someState&nonce=someNonce&prompt=login&scope=openid http://myapp.com/scp/silver

Example, with variables:
https://{{okta_tenant}}/oauth2/{{authz_server_id}}/v1/authorize?response_type=token id_token&client_id={{client_id}}&redirect_uri={{web app url}}&state=someState&nonce=someNonce&prompt=login&scope={{space-separated list of scopes}}

If all goes well, this authentication process will send an id token and an access token as parameters back to the redirect uri (your web app).


