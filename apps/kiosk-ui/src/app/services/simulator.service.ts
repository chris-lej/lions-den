import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SimulatorResponse {
  status: string;
  event_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  private readonly API_BASE_URL = this.getApiBaseUrl();

  private getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const apiPort = window.location.port === '80' || window.location.port === '' 
        ? '8000' 
        : '8000';
      return `${window.location.protocol}//${window.location.hostname}:${apiPort}/api`;
    }
    return 'http://localhost:8000/api';
  }

  constructor(private http: HttpClient) {}

  simulateDoorOpen(): Observable<SimulatorResponse> {
    return this.http.post<SimulatorResponse>(`${this.API_BASE_URL}/simulator/door/open`, {});
  }

  simulateDoorClose(): Observable<SimulatorResponse> {
    return this.http.post<SimulatorResponse>(`${this.API_BASE_URL}/simulator/door/close`, {});
  }

  simulatePresenceOccupied(): Observable<SimulatorResponse> {
    return this.http.post<SimulatorResponse>(`${this.API_BASE_URL}/simulator/presence/occupied`, {});
  }

  simulatePresenceVacant(): Observable<SimulatorResponse> {
    return this.http.post<SimulatorResponse>(`${this.API_BASE_URL}/simulator/presence/vacant`, {});
  }

  simulateArrival(): Observable<SimulatorResponse> {
    return this.http.post<SimulatorResponse>(`${this.API_BASE_URL}/simulator/arrival`, {});
  }

  getHealth(): Observable<{ status: string; service: string; current_state: string }> {
    return this.http.get<{ status: string; service: string; current_state: string }>(`${this.API_BASE_URL}/health`);
  }
}

