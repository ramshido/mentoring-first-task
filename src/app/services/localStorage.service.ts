import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	public getUsersFromLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  public saveUsersToLocalStorage<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  };

	public removeLovalStorage(key: string):void {
		localStorage.removeItem(key);
	};
}