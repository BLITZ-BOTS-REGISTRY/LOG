// Utility function to truncate long strings
export const truncate = (str: string, length: number = 1024) => 
    str.length > length ? str.substring(0, length) + '...' : str;
  
  // Utility function to create a safe JSON stringify
export  const safeStringify = (obj: any) => {
    try {
      return JSON.stringify(obj, (_, v) => 
        typeof v === 'bigint' ? v.toString() : 
        v instanceof Error ? { name: v.name, message: v.message } : 
        v, 2);
    } catch {
      return 'Unable to stringify object';
    }
  };