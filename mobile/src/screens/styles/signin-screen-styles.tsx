import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../config/colors';

const {width} = Dimensions.get('window');
const isSmallPhone = width < 390; // iPhone SE, iPhone 12 mini
const isLargePhone = width >= 428; // iPhone Pro Max, Plus

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isSmallPhone ? 16 : 24,
    paddingHorizontal: isSmallPhone ? 12 : 16,
  },
  card: {
    width: '100%',
    maxWidth: isLargePhone ? 480 : undefined, // maxWidth chỉ trên phone lớn
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: isSmallPhone ? 20 : 28,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconEmoji: {
    fontSize: 28,
  },
  title: {
    fontSize: isSmallPhone ? 20 : 24,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  // ─── Tab ───────────────────────────────────────────
  tabWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 4,
    marginBottom: isSmallPhone ? 16 : 28,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: Colors.tabInactive,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.text,
    fontWeight: '600',
  },
  // ─── Input ─────────────────────────────────────────
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
    marginTop: isSmallPhone ? 4 : 8,
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: isSmallPhone ? 6 : 12,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    fontSize: 15,
    color: Colors.text,
    height: 46,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginBottom: 6,
    marginLeft: 2,
  },
  // ─── Forgot ────────────────────────────────────────
  forgotWrap: {
    alignSelf: 'flex-end',
    marginVertical: isSmallPhone ? 6 : 10,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
  // ─── Buttons ───────────────────────────────────────
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: isSmallPhone ? 12 : 15,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: isSmallPhone ? 8 : 12,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: isSmallPhone ? 10 : 13,
    marginBottom: isSmallPhone ? 14 : 20,
    gap: 8,
  },
  biometricText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  // ─── Divider ───────────────────────────────────────
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isSmallPhone ? 10 : 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  // ─── Social ────────────────────────────────────────
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: isSmallPhone ? 12 : 20,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: isSmallPhone ? 9 : 11,
    gap: 8,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  socialIcon: {
    fontSize: 16,
  },
  // ─── Sign up row ───────────────────────────────────
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  signupLink: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  // ─── Terms ─────────────────────────────────────────
  termsRow: {
    marginTop: isSmallPhone ? 8 : 12,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  termsText: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  // ─── Checkbox ──────────────────────────────────────
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isSmallPhone ? 10 : 16,
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxTick: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
