---
layout: post
title: "Publishing an Android Library to Maven Central with Gradle"
date: 2013-12-06 14:19
comments: true
categories:
---

I recently migrated the [We Heart It Android app](https://play.google.com/store/apps/details?id=com.weheartit) project to Android Studio and I thought I'd migrate the [Android-ImageManager](https://github.com/felipecsl/Android-ImageManager) library into the new format as well. That was the easy part. Another thing I wanted to do was to upload it to Maven Central, so it would make people's lives easier when using it.

Ok this was painful. Here are the steps I took in order to achieve it, so hopefully people won't struggle that much doing it in the future:

1. Follow Chris Banes' [steps](http://chris.banes.me/blog/2013/08/27/pushing-aars-to-maven-central/);
2. Follow the steps [here](https://github.com/chrisbanes/gradle-mvn-push) to configure the upload username and password;
3. Make sure you edit `gradle.properties` and `build.gradle` with your library's information (version, description, links, etc);
4. Follow [this](https://docs.sonatype.org/display/Repository/Sonatype+OSS+Maven+Repository+Usage+Guide) guide. To summarize, you'll need to create a Sonatype [JIRA](https://issues.sonatype.org/secure/Dashboard.jspa) account and then you'll have to create an issue there in order to create your project. That is basically apply for open source project hosting (that's basically the steps 2 and 3 on the user guide mentioned above);
5. Wait for your issue to be "Resolved", that may take up to 2 business days (!!!). Someone from Sonatype will do it and you'll get an email;
6. Run `./gradlew clean build uploadArchives` to build and upload your project into Sonatype. IMPORTANT: You have to upload a Debug build first, otherwise it is not gonna work. You do that by adding `-SNAPSHOT` at the end of your `VERSION_NAME` on `gradle.properties`, like this, eg.: `VERSION_NAME=1.0.0-SNAPSHOT`
7. After that, if all went well, you should see your project [here](http://oss.sonatype.org/content/repositories/snapshots/). You can navigate through the folders. My project's group id was `com.felipecsl.android`, so I could find it at [http://oss.sonatype.org/content/repositories/snapshots/com/felipecsl/android/](http://oss.sonatype.org/content/repositories/snapshots/com/felipecsl/android/)

I still havent figured out how to promote a Staging Repository. Right now it is failing to close the repository since the package is not signed. I will update this post once I have a solution.
In the meantime, you can already use your snapshot with Maven/Gradle.
Here is how your `build.gradle` would look like:

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.6.+'
    }
}
apply plugin: 'android'

repositories {
    maven { url "https://oss.sonatype.org/content/repositories/snapshots/" }
    mavenCentral()
}

dependencies {
    compile 'com.felipecsl.android:library:1.0.0-SNAPSHOT'
}
```

Well that is pretty much it for now. It took me almost an entire afternoon to figure this all out, hope it is useful for other people.
If you're interested in a simpler and a lot more elegant solution for Open Source library project hosting, check [rubygems.org](http://rubygems.org) which is used to, guess what, host Ruby gems. That is really piece of cake compared to all this Java mess :sigh:
