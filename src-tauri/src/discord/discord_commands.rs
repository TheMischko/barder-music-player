use crate::discord::discord_manager::DiscordManager;

#[tauri::command]
pub async  fn discord_connect(token: &str) -> Result<bool, String>{
    let discord_manager = DiscordManager::new(token).await;
    Ok(true)
}