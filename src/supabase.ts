import { createClient } from '@supabase/supabase-js'
import config from './config.js'

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)
const storageBucket = supabase.storage.from("repoprovas")

export default storageBucket;