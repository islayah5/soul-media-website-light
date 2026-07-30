#!/usr/bin/env python3
"""
SOUL MEDIA POSTHOG ANALYTICS & CONVERSION CLI ENGINE
Queries live event telemetry, conversion funnels, and test user status from PostHog API.
"""

import urllib.request
import json
import sys
import os
from collections import Counter

API_KEY = os.environ.get("POSTHOG_API_KEY", "")
PROJECT_ID = os.environ.get("POSTHOG_PROJECT_ID", "533998")
BASE_URL = "https://us.posthog.com"

def fetch_events_summary(limit=100):
    url = f"{BASE_URL}/api/projects/{PROJECT_ID}/events/?limit={limit}"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {API_KEY}"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            results = data.get("results", [])
            counts = Counter([e.get("event") for e in results])
            
            print(f"\n=======================================================")
            print(f"  SOUL MEDIA LIVE TELEMETRY SUMMARY ({len(results)} EVENTS ANALYZED)")
            print(f"=======================================================")
            for event_name, cnt in counts.most_common():
                print(f"  • {event_name:<30}: {cnt} occurrences")
            print(f"=======================================================\n")
    except Exception as e:
        print(f"[ERROR] Failed to fetch events: {e}")

def main():
    print("Initializing Soul Media PostHog Live Analytics Engine...")
    fetch_events_summary()

if __name__ == "__main__":
    main()
