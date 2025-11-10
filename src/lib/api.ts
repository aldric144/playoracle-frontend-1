const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface User {
  id: string;
  email: string;
  full_name: string;
  subscription_tier: string;
  sports_dna: Record<string, any>;
  badges: string[];
  created_at: string;
}

export interface Game {
  id: string;
  sport: string;
  league: string;
  home_team: string;
  away_team: string;
  scheduled_time: string;
  home_score?: number;
  away_score?: number;
  status: string;
}

export interface AIPrediction {
  game_id: string;
  predicted_winner: string;
  confidence: number;
  dci_score: number;
  analysis: string;
  factors: Record<string, any>;
  created_at: string;
}

export interface UserPrediction {
  id: string;
  user_id: string;
  game_id: string;
  sport: string;
  predicted_winner: string;
  confidence: number;
  created_at: string;
  actual_winner?: string;
  was_correct?: boolean;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Request failed');
    }

    return response.json();
  }

  async signup(email: string, password: string, full_name: string) {
    const data = await this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
    this.setToken(data.access_token);
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.access_token);
    return data;
  }

  async getMe(): Promise<User> {
    return this.request('/api/auth/me');
  }

  async updateMe(updates: { full_name?: string; sports_dna?: Record<string, any> }): Promise<User> {
    return this.request('/api/auth/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getSports() {
    return this.request('/api/sports');
  }

  async getSchedule(sport: string, showAll: boolean = false): Promise<Game[]> {
    return this.request(`/api/sports/${sport}/schedule?show_all=${showAll}`);
  }

  async getStandings(sport: string) {
    return this.request(`/api/sports/${sport}/standings`);
  }

  async getTeams(sport: string) {
    return this.request(`/api/sports/${sport}/teams`);
  }

  async getAIPrediction(gameId: string): Promise<AIPrediction> {
    return this.request(`/api/predictions/game/${gameId}`);
  }

  async submitPrediction(gameId: string, sport: string, predictedWinner: string, confidence: number): Promise<UserPrediction> {
    return this.request('/api/predictions/user', {
      method: 'POST',
      body: JSON.stringify({
        game_id: gameId,
        sport,
        predicted_winner: predictedWinner,
        confidence,
      }),
    });
  }

  async getPredictionHistory(): Promise<UserPrediction[]> {
    return this.request('/api/predictions/user/history');
  }

  async getUserAccuracy() {
    return this.request('/api/predictions/user/accuracy');
  }

  async getUserInsights() {
    return this.request('/api/predictions/user/insights');
  }

  async getTrends(sport: string) {
    return this.request(`/api/analytics/trends/${sport}`);
  }

  async getTeamAnalytics(teamId: string) {
    return this.request(`/api/analytics/team/${teamId}`);
  }

  async getCoachCorner(gameId: string) {
    return this.request(`/api/analytics/coach-corner/${gameId}`);
  }

  async getSportsDNA() {
    return this.request('/api/user/sports-dna');
  }

  async updateSportsDNA(sportsDNA: Record<string, any>) {
    return this.request('/api/user/sports-dna', {
      method: 'PUT',
      body: JSON.stringify(sportsDNA),
    });
  }

  async getBadges() {
    return this.request('/api/user/badges');
  }

  async getProgress() {
    return this.request('/api/user/progress');
  }

  async getReport() {
    return this.request('/api/user/report');
  }

  async getGlobalLeaderboard() {
    return this.request('/api/leaderboard/global');
  }

  async getSportLeaderboard(sport: string) {
    return this.request(`/api/leaderboard/${sport}`);
  }

  async getChallenges() {
    return this.request('/api/leaderboard/challenges');
  }

  async getSubscriptionPlans() {
    return this.request('/api/subscription/plans');
  }

  async createCheckoutSession(planId: string) {
    return this.request('/api/subscription/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
  }

  async getSubscriptionStatus() {
    return this.request('/api/subscription/status');
  }

  async cancelSubscription() {
    return this.request('/api/subscription/cancel', {
      method: 'POST',
    });
  }

  async getEventsList() {
    return this.request('/api/events/list');
  }

  async verifyEventAccess(eventSlug: string) {
    return this.request(`/api/events/verify-access/${eventSlug}`);
  }

  async getMyEventSubscriptions() {
    return this.request('/api/events/my-subscriptions');
  }

  async mockEventCheckout(eventSlug: string, optionType: string) {
    return this.request('/api/events/mock-checkout', {
      method: 'POST',
      body: JSON.stringify({ event_slug: eventSlug, option_type: optionType }),
    });
  }

  async getRivalryHistory(teamA: string, teamB: string, sport: string, limit: number = 10) {
    return this.request(`/api/rivalry/history?team_a=${encodeURIComponent(teamA)}&team_b=${encodeURIComponent(teamB)}&sport=${encodeURIComponent(sport)}&limit=${limit}`);
  }

  async getRivalryInsight(teamA: string, teamB: string, sport: string) {
    return this.request(`/api/rivalry/insight?team_a=${encodeURIComponent(teamA)}&team_b=${encodeURIComponent(teamB)}&sport=${encodeURIComponent(sport)}`);
  }

  async getBoxingEvents() {
    return this.request('/api/boxing/upcoming');
  }

  async getFighterDetails(fighterId: string) {
    return this.request(`/api/boxing/fighter/${fighterId}`);
  }

  async getBoxingDCI(fightId: string) {
    return this.request(`/api/boxing/dci/${fightId}`);
  }

  async getFighterHistory(fighterId: string, limit: number = 10) {
    return this.request(`/api/boxing/history/${fighterId}?limit=${limit}`);
  }

  async getSportsIntelSchedule(sport: string, useCache: boolean = true) {
    return this.request(`/api/sports-intel/schedule/${sport}?use_cache=${useCache}`);
  }

  async getSportsIntelStatus() {
    return this.request('/api/sports-intel/status');
  }

  async getMMAEvents() {
    return this.request('/api/mma/upcoming');
  }

  async getMMAFight(fightId: string) {
    return this.request(`/api/mma/fight/${fightId}`);
  }

  async getMMADCI(fightId: string) {
    return this.request(`/api/mma/dci/${fightId}`);
  }

  async getTennisEvents() {
    return this.request('/api/tennis/upcoming');
  }

  async getTennisMatch(matchId: string) {
    return this.request(`/api/tennis/match/${matchId}`);
  }

  async getTennisDCI(matchId: string) {
    return this.request(`/api/tennis/dci/${matchId}`);
  }

  async getHockeyEvents() {
    return this.request('/api/hockey/upcoming');
  }

  async getHockeyGame(gameId: string) {
    return this.request(`/api/hockey/game/${gameId}`);
  }

  async getHockeyDCI(gameId: string) {
    return this.request(`/api/hockey/dci/${gameId}`);
  }

  async getVolleyballEvents() {
    return this.request('/api/volleyball/upcoming');
  }

  async getVolleyballMatch(matchId: string) {
    return this.request(`/api/volleyball/match/${matchId}`);
  }

  async getVolleyballDCI(matchId: string) {
    return this.request(`/api/volleyball/dci/${matchId}`);
  }

  async getRugbyEvents() {
    return this.request('/api/rugby/upcoming');
  }

  async getRugbyMatch(matchId: string) {
    return this.request(`/api/rugby/match/${matchId}`);
  }

  async getRugbyDCI(matchId: string) {
    return this.request(`/api/rugby/dci/${matchId}`);
  }

  async getCricketEvents() {
    return this.request('/api/cricket/upcoming');
  }

  async getCricketMatch(matchId: string) {
    return this.request(`/api/cricket/match/${matchId}`);
  }

  async getCricketDCI(matchId: string) {
    return this.request(`/api/cricket/dci/${matchId}`);
  }

  async getLiveUpcoming(sport: string) {
    return this.request(`/api/live/${sport}/upcoming`);
  }

  async getLiveScores(sport: string) {
    return this.request(`/api/live/${sport}/scores`);
  }

  async getLiveStandings(sport: string) {
    return this.request(`/api/live/${sport}/standings`);
  }

  async getLiveDataStatus() {
    return this.request('/api/live/status');
  }

  async getSeasonHistory(sport: string, year: number) {
    return this.request(`/api/history/${sport}/${year}`);
  }

  async getAccuracyTrend(sport: string, fromYear: number, toYear: number) {
    return this.request(`/api/history/${sport}/accuracy?from_year=${fromYear}&to_year=${toYear}`);
  }

  async get(endpoint: string) {
    return this.request(endpoint);
  }
}

export const api = new ApiClient();
