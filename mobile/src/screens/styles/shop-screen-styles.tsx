// mobile/src/screens/styles/shop-screen.styles.ts

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // ─── Header ────────────────────────────────────────────────────
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  // ─── Search ────────────────────────────────────────────────────
  searchBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e4e6f0',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#222',
    fontSize: 14,
  },

  // ─── Category pills ────────────────────────────────────────────
  categoryPillsContainer: {
    height: 42, // ← fixed height: prevents collapsing when empty / expanding when loading
    marginBottom: 14,
    flexGrow: 0, // ← prevents ScrollView from stretching
  },
  categoryPillsContent: {
    alignItems: 'center', // ← vertically centre pills inside the fixed-height scroll view
    paddingRight: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#fff',
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#e3e3ed',
    marginRight: 8,
    height: 34, // ← explicit pill height so every pill is identical
    justifyContent: 'center',
  },
  activeCategoryPill: {
    backgroundColor: '#00d4ff',
    borderColor: '#00c3eb',
  },
  categoryText: {
    fontSize: 12,
    color: '#444',
  },
  activeCategoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
  },

  // ─── Product grid ──────────────────────────────────────────────
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  // ─── Product card ──────────────────────────────────────────────
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '48%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 140,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  saleBadge: {
    position: 'absolute',
    left: 8,
    top: 8,
    backgroundColor: '#00d4ff',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  saleLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  cardContent: {
    padding: 10,
  },
  productCategory: {
    color: '#78909c',
    fontSize: 12,
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00d4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Unauthenticated ───────────────────────────────────────────
  unauthText: {
    padding: 16,
    color: '#444',
    fontSize: 16,
    textAlign: 'center',
  },
});
