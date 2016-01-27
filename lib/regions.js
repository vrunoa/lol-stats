import config from '../config.json'
import regionsList from '../regions.json'

export default function regions(selected = "NA") {
  if(selected) selected = selected.trim().toUpperCase()
  return regionsList.indexOf(selected) == -1 ? 
    config["default_region"] : selected
}
