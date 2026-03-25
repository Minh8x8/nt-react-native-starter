import {StyleSheet} from 'react-native';

export const cardShadow = {
  shadowColor: '#0d1a2b',
  shadowOpacity: 0.06,
  shadowOffset: {width: 0, height: 8},
  shadowRadius: 16,
  elevation: 4,
};

export const profileStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    ...cardShadow,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f1f27',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 16,
    ...cardShadow,
  },
  centerContent: {
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e9f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1cc8d9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f1f27',
  },
  username: {
    marginTop: 4,
    fontSize: 14,
    color: '#8b90a0',
  },
  membershipBadge: {
    marginTop: 12,
    backgroundColor: '#d3f2ff',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1ac2d6',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f1f27',
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1ac2d6',
  },
});
