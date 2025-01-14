import { connect } from 'react-redux';

import {
  setPendingTokens,
  clearPendingTokens,
  getTokenStandardAndDetails,
  showImportNftsModal,
} from '../../store/actions';
import { getMostRecentOverviewPage } from '../../ducks/history/history';
import { getProviderConfig } from '../../ducks/metamask/metamask';
import {
  getRpcPrefsForCurrentProvider,
  getIsTokenDetectionSupported,
  getTokenDetectionSupportNetworkByChainId,
  getIsTokenDetectionInactiveOnMainnet,
  getIsDynamicTokenListAvailable,
  getIstokenDetectionInactiveOnNonMainnetSupportedNetwork,
  getTokenList,
} from '../../selectors/selectors';
import ImportToken from './import-token.component';

const mapStateToProps = (state) => {
  const {
    metamask: {
      identities,
      tokens,
      pendingTokens,
      useTokenDetection,
      selectedAddress,
    },
  } = state;
  const { chainId } = getProviderConfig(state);

  const isTokenDetectionInactiveOnMainnet =
    getIsTokenDetectionInactiveOnMainnet(state);
  const showSearchTab =
    getIsTokenDetectionSupported(state) ||
    isTokenDetectionInactiveOnMainnet ||
    Boolean(process.env.IN_TEST);

  return {
    identities,
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
    tokens,
    pendingTokens,
    showSearchTab,
    chainId,
    rpcPrefs: getRpcPrefsForCurrentProvider(state),
    tokenList: getTokenList(state),
    useTokenDetection,
    selectedAddress,
    isDynamicTokenListAvailable: getIsDynamicTokenListAvailable(state),
    networkName: getTokenDetectionSupportNetworkByChainId(state),
    tokenDetectionInactiveOnNonMainnetSupportedNetwork:
      getIstokenDetectionInactiveOnNonMainnetSupportedNetwork(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPendingTokens: (tokens) => dispatch(setPendingTokens(tokens)),
    clearPendingTokens: () => dispatch(clearPendingTokens()),
    showImportNftsModal: () => dispatch(showImportNftsModal()),
    getTokenStandardAndDetails: (address, selectedAddress) =>
      getTokenStandardAndDetails(address, selectedAddress, null),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportToken);
