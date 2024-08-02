use serde_json::Value;
use crate::settings::settings_manager::SettingsManager;

#[tauri::command]
pub fn read_settings(key: String) -> Result<String, String>{
    let settings = SettingsManager::new();
    match settings.read_key(key.as_str()){
        Some(val) => Ok(val.to_string()),
        None => Err(format!("Key '{}' not found in the settings", key))
    }
}

#[tauri::command]
pub fn write_settings(key: String, val: String) -> Result<String, String>{
    let settings = SettingsManager::new();
    match settings.update_key(key.as_str(), Value::String(val)){
        Some(val) => Ok(val.to_string()),
        None => Err(format!("Couldn't update key '{}' in the settings", key))
    }
}