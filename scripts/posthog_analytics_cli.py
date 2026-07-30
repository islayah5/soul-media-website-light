#!/usr/bin/env python3
"""
SOUL MEDIA POSTHOG EXECUTIVE COMMAND CENTER CLI ENGINE
Provides automated real-time conversion funnels, high-intent lead velocity,
and telemetry auditing for soul-media-group.netlify.app.
"""

import urllib.request
import json
import os
import sys
from collections import Counter

API_KEY = os.environ.get("POSTHOG_API_KEY", "")
PROJECT_ID = os.environ.get("POSTHOG_PROJECT_ID", "533998")
BASE_URL = "https://us.posthog.com"

def fetch_telemetry_report():
    url = f"{BASE_URL}/api/projects/{PROJECT_ID}/events/?limit=250"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {API_KEY}"})
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            results = data.get("results", [])
            
            events_counter = Counter([e.get("event") for e in results])
            distinct_users = set([e.get("distinct_id") for e in results if e.get("distinct_id")])
            
            print("\n" + "="*65)
            print("  SOUL MEDIA EXECUTIVE COMMAND CENTER — TELEMETRY SWEEP")
            print("="*65)
            print(f"  • Production Domain   : https://soul-media-group.netlify.app")
            print(f"  • Active Project ID   : {PROJECT_ID}")
            print(f"  • Total Events Scanned: {len(results)}")
            print(f"  • Unique Visitor IDs  : {len(distinct_users)}")
            print("-"*65)
            print("  EVENT OCCURRENCE BREAKDOWN:")
            print("-"*65)
            
            for event_name, count in events_counter.most_common():
                indicator = "🔥" if "submitted" in event_name or "booking" in event_name else "📈"
                print(f"  {indicator} {event_name:<32}: {count:<5} occurrences")
            
            print("-"*65)
            print("  PRIMARY CONVERSION FUNNEL METRICS:")
            print("-"*65)
            
            landing_views = events_counter.get("$pageview", 0)
            scope_steps = events_counter.get("scope_builder_step_viewed", 0)
            scope_submits = events_counter.get("scope_builder_submitted", 0)
            cal_bookings = events_counter.get("cal_booking_modal_opened", 0)
            
            print(f"  1. Landing Page Visits        : {landing_views}")
            print(f"  2. Scope Builder Interactions : {scope_steps}")
            print(f"  3. Custom Scopes Transmitted  : {scope_submits}")
            print(f"  4. Strategy Calls Launched    : {cal_bookings}")
            print("="*65 + "\n")
            
    except Exception as e:
        print(f"[ERROR] Failed to execute telemetry report: {e}")

if __name__ == "__main__":
    fetch_telemetry_report()
