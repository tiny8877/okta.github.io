---
layout: docs_page
title: Check the Attributes for Your Application and their corresponding Mappings
excerpt: Check the attributes and the corresponding mappings for a SCIM app that has been created through the app wizard.
---

# Check the Attributes For Your Application and Their Corresponding Mappings #


## Overview ##

The last step for you to complete before submitting your application to
Okta is to check the attributes you need to include in your SCIM
integration and their corresponding mappings.  When you add a SCIM
template application in your development org, it will come bootstrapped
with the default base attributes. These attributes may not all be
supported by your application's user schema so it is very important that
you go through the steps below to ensure that the application you're
submitting to Okta for review reflects the attributes you support.

> Note: If you don't update your attributes and mappings before
submitting your app for review to Okta, the initial review coming from
Okta will always ask you to do so.

## I. Deleting Attributes ##


> Note: Before you can delete an attribute, you first have to remove
the mapping for that attribute. Not doing so will prevent you from
deleting the attribute.

### A. Removing the Mapping For the Attribute to be Deleted. ###


1.  From the Admin UI, open your SCIM template application.

2.  Go to the **Provisioning** tab. Under the **SETTINGS** section,
    click on **To App**.
    {% img scim_attributes_screenshots/image1.png alt:"To App" width:"625px" %}

3.  Scroll down until you see the Attribute Mappings section. Look for
    the attribute that you want to delete and then click on the **X**
    button.
    {% img scim_attributes_screenshots/image2.png alt:"Attribute Mappings" width:"352" %}

4.  You will be asked if you would like to remove the mapping for the
    attribute you selected, click **OK**.
    {% img scim_attributes_screenshots/image3.png alt:"Remove Mapping" width:"625px" %}

5.  After removing the mapping for the unwanted attributes, click on
    **To Okta** under the settings section.
    {% img scim_attributes_screenshots/image4.png alt:"To Okta" width:"625px" %}

6.  Repeat the steps you followed in Step 3 and 4 until you have removed
    all the mappings for the attributes you want to delete.

### B. Deleting Attributes From Your Attribute List ###


1.  From the Admin UI, open your SCIM template application.

2.  Go to the **Provisioning** tab. Under the **SETTINGS** section,
    click on **To App**.
    {% img scim_attributes_screenshots/image1.png alt:"To App" width:"625px" %}

3.  Scroll down until you see the Attribute Mappings section. Click on
    **Go to Profile Editor**.
    {% img scim_attributes_screenshots/image6.png alt:"Go to Profile Editor" width:"352px" %}

4.  In the Profile Editor, scroll down to the attribute list.

5.  Look for the attribute that you want to delete and then click on the
    **X** button.
    {% img scim_attributes_screenshots/image6.png alt:"Delete Attribute" width:"625px" %}

6.  Done!

## II. Adding Attributes ##


1.  From the Admin UI, open your SCIM template application.

2.  Go to the **Provisioning** tab. Under the **SETTINGS** section,
    click on **To App**.
    {% img scim_attributes_screenshots/image1.png alt:"Provisioning Tab" width:"625px" %}

3.  Scroll down until you see the Attribute Mappings section. Click on
    **Go to Profile Editor**.
    {% img scim_attributes_screenshots/image5.png alt:"Go to Profile Editor" width:"352px" %}

4.  In the Profile Editor, click on **Add Attribute.**
    {% img scim_attributes_screenshots/image7.png alt:"Add Attribute" width:"625px" %}
    - Enter the information for the new attribute that you're adding
    and then click **Save**.
    > Note: The Scope property determines
    whether the attribute you are adding can be assigned at a Group
    level or just per user. If you would like the ability for admins to
    assign a value for this attribute at a Group level, ***DO NOT***
    check the **User personal** checkbox.

    {% img scim_attributes_screenshots/image8.png alt:"Add Attribute" width:"352px" %}

5.  After adding an attribute, proceed to **Section III (Mapping
    Attributes)** to add a mapping to the new attribute you just added.

## III. Mapping Attributes ##


1.  From the Admin UI, open your SCIM template application.

2.  Go to the **Provisioning** Under the settings section, click on **To
    App**.
    {% img scim_attributes_screenshots/image9.png alt:"To App" width:"625px" %}

3.  Scroll down until you see the Attribute Mappings section. Look for
    the attribute that you want to update and then click on the
    **pencil** button.
    {% img scim_attributes_screenshots/image10.png alt:"Add Attribute" width:"536px" %}

4.  On the pop-up that appears, there will be two drop-down fields. On
    the first drop-down, select **Map from Okta Profile**. On the second
    drop-down, choose the Okta profile attribute you would like to map
    the SCIM attribute from. Click **Save**.
    {% img scim_attributes_screenshots/image11.png alt:"Map from Okta Profile" width:"625px" %}

5.  Repeat the same step for all other SCIM attributes that you would
    like to modify the mapping for (Okta to app).

6.  After updating the mappings from Okta to your app, click on **To
    Okta** under the settings section.
    {% img scim_attributes_screenshots/image12.png alt:"To Okta" width:"625px" %}

7.  Scroll down until you see the Attribute Mappings section. Look for
    the attribute that you want to update and then click on the
    **pencil** button.
    {% img scim_attributes_screenshots/image13.png alt:"Edit Attributes" width:"536px" %}

8.  On the pop-up that appears, there will be two drop-down fields. On
    the first drop-down, select **Map from SCIM 2.0 Test App Profile**.
    On the second drop-down, choose the Okta profile attribute you would
    like to map the SCIM attribute to. Click **Save**.
    {% img scim_attributes_screenshots/image14.png alt:"Map from SCIM 2.0 Test App Profile" width:"625px" %}

9.  Repeat the same step for all other SCIM attributes that you would
    like to modify the mapping for (App to Okta).

10. Done!

## Notes ##


-   You should only include the attributes that you support in your
    current user schema. To ensure that the attributes are being sent
    properly from and to Okta:
    - When assigning a user to the SCIM app you added in your dev org,
    make sure that all attributes are populated for that user. After the
    user is pushed to your app, check that all attributes are populated
    on your end.
    - If your app supports User Imports, try importing one user from
    your app. Check the imported user and make sure that the values for
    supported attributes are reflected in that imported user's account
    in Okta. To do this:

      1. Go to your Admin UI.

      2. Hover over **Directory** and click on **People**.
    {% img scim_attributes_screenshots/image15.png alt:"People Option" width:"625px" %}

      3. You should see the list of Okta users for your org. Find the
    user you just imported and click on that user's name.
    
      4. Once the user's account is opened, click on **Profile**. This
    will show you that user's attributes. Check whether the values for
    the attributes you support were properly imported for this user.
    {% img scim_attributes_screenshots/image16.png alt:"Profile Tab" width:"275px" %}

-   The Profile Mapping template can always be updated in the future.

-   As briefly mentioned in the Adding/Deleting Attributes section
    above, you will have the ability to set whether the attribute you
    are adding can be set per user or both per user and group. This is
    done via the **Scope** attribute. If you want the attribute you are
    adding to be strictly set per user, you would need to check the
    **User personal** checkbox for the Scope attribute. If you want to
    give admins the ability to set the attribute both per user or per
    group, don't check this checkbox.
    {% img scim_attributes_screenshots/image17.png alt:"User personal checkbox" width:"625px" %}