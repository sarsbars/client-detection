'use strict';

const userAgent = window.navigator.userAgent;

function getOS() {
  let os = "Unknown OS";

  if (userAgent.indexOf("Windows") !== -1) {
    os = "Windows";
  } else if (userAgent.indexOf("Macintosh") !== -1 || userAgent.indexOf("Mac OS X") !== -1) {
    os = "Mac OS";
  } else if (userAgent.indexOf("Linux") !== -1) {
    os = "Linux";
  } else if (userAgent.indexOf("Android") !== -1) {
    os = "Android";
  } else if (userAgent.indexOf("iP") !== -1) {
    os = "iOS";
  }
  return os;
}

function getLanguage() {
    let language = navigator.language || navigator.userLanguage;
    return language;
}

function getBrowser() {
    let browser = 'Unknown Browser';
  
    if (userAgent.indexOf('Chrome') > -1) {
      browser = 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      browser = 'Apple Safari';
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      browser = 'Opera';
    } else if (userAgent.indexOf('Firefox') > -1) {
      browser = 'Mozilla Firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || !!document.documentMode) {
      browser = 'Internet Explorer';
    } else if (userAgent.indexOf('Edge') > -1) {
      browser = 'Microsoft Edge';
    }
  
    return browser;
  }

function getWidth() {
    let width = window.innerWidth;
    return width;
}
    
function getHeight() {
    let height = window.innerHeight;
    return height;
}

function getOrient() {
    const orientation = screen.orientation.type;
  
    if (orientation.includes('portrait')) {
      return 'Portrait';
    } else if (orientation.includes('landscape')) {
      return 'Landscape';
    } else {
      return 'Unknown Orientation';
    }
  }

//I followed chatGPT on async functions with try, catch and await
async function updateBatteryInfo() {
    if (!('getBattery' in navigator)) {
        document.querySelector(".level").textContent = 'Level: Not available';
        document.querySelector(".status").textContent = 'Status: Not available';
        return;
    }

    try {
        const battery = await navigator.getBattery();
        document.querySelector(".level").textContent = 
        `Level: ${Math.round(battery.level * 100)}%`;
        document.querySelector(".status").textContent = 
        `Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
        
        battery.addEventListener('levelchange', () => {
            document.querySelector(".level").textContent = 
            `Level: ${Math.round(battery.level * 100)}%`;
        });
        battery.addEventListener('chargingchange', () => {
            document.querySelector(".status").textContent = 
            `Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
        });
    } catch (error) {
        document.querySelector(".level").textContent = 'Level: Not available';
        document.querySelector(".status").textContent = 'Status: Not available';
    }
}

function getNetworkStatus() {
    const networkStatus = navigator.onLine ? 'Online' : 'Offline';
    const statusDisplay = document.querySelector('.network-status');
    statusDisplay.textContent = networkStatus.toUpperCase();
    statusDisplay.className = `network-status ${networkStatus.toLowerCase()}`;
}

function updateWindowInfo() {
    document.querySelector(".width").textContent = `Width: ${getWidth()}`;
    document.querySelector(".height").textContent = `Height: ${getHeight()}`;
    document.querySelector(".ori").textContent = `Orientation: ${getOrient()}`;

}

if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);
    });
}

window.addEventListener('resize', function() {
   updateWindowInfo();
});

window.addEventListener('load', function() {
    document.querySelector(".os").textContent = `OS: ${getOS()}`;
    document.querySelector(".lang").textContent = `Language: ${getLanguage()}`;
    document.querySelector(".browser").textContent = `Browser: ${getBrowser()}`;
    
    updateWindowInfo();
    updateBatteryInfo();
    getNetworkStatus();
});

window.addEventListener('online', getNetworkStatus);
window.addEventListener('offline', getNetworkStatus);





    
    