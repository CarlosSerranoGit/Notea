package com.pcserrano.Notea;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.whitestein.securestorage.SecureStoragePlugin;
//import com.capacitorjs.plugins.storage.StoragePlugin;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstaceState){
        super.onCreate(savedInstaceState);

        //Aquí los plugin no oficiales
       // registerPlugin(StoragePlugin.class);
        registerPlugin(GoogleAuth.class);
        registrePlugin(SecureStoragePlugin.class);
    }
}


