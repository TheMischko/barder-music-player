use std::collections::HashMap;
use std::fs;
use std::fs::OpenOptions;
use std::io::{BufReader, BufWriter};
use std::path::{PathBuf};
use serde_json::Value;

pub struct SettingsManager {
    path: PathBuf,
}

impl SettingsManager {
    pub fn new() -> SettingsManager {
        let path = PathBuf::from(get_settings_path().as_str());
        if !path.exists(){
            fs::File::create(&path).expect("Failed to create settings file.");
        }
        SettingsManager { path }
    }

    pub fn read_key(&self, key: &str) -> Option<Value> {
        let content = self.read_all();
        content.get(key).cloned()
    }

    pub fn update_key(&self, key: &str, value: Value) -> Option<Value> {
        let mut content = self.read_all();
        let value_copy = value.clone();
        content.insert(key.to_string(), value);
        self.save_values(&content);
        Some(value_copy)
    }

    fn read_all(&self) -> HashMap<String, Value> {
        let file = OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .open(&self.path)
            .expect("Failed to open settings file.");
        let buffered_reader = BufReader::new(file);

        serde_json::from_reader(buffered_reader).unwrap_or_else(|_| HashMap::new())
    }

    fn save_values(&self, map: &HashMap<String, Value>) {
        let file = OpenOptions::new()
            .write(true)
            .truncate(true)
            .create(true)
            .open(&self.path)
            .expect("Failed to open settings file for writing.");
        let buffered_writer = BufWriter::new(file);

        serde_json::to_writer_pretty(buffered_writer, map).expect("Could not write JSON content");
    }
}

fn get_settings_path() -> String {
    let home_dir = dirs::home_dir().unwrap();
    home_dir.to_str().unwrap().to_string() + "/.barder/settings.json"
}