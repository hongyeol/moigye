package com.moigye;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
//import com.microsoft.codepush.react.CodePush;
//import com.microsoft.codepush.react.ReactInstanceHolder;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;
/*
public class MyReactNativeHost extends ReactNativeHost implements ReactInstanceHolder {
  // ... usual overrides
}*/

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
/*
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }*/
    

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RNGoogleSigninPackage(),
            new RNFetchBlobPackage(),
            new FIRMessagingPackage(),
            new FacebookLoginPackage()
            //new CodePush("123456", getApplicationContext(), BuildConfig.DEBUG),
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    //CodePush.setReactInstanceHolder(mReactNativeHost);
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
