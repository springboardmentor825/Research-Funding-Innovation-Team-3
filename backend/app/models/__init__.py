import importlib.util
import os
import sys

# Load backend/models.py directly without sys.path collision
_models_file = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "models.py")
if "_backend_models_module" not in sys.modules:
    spec = importlib.util.spec_from_file_location("_backend_models_module", _models_file)
    _mod = importlib.util.module_from_spec(spec)
    sys.modules["_backend_models_module"] = _mod
    spec.loader.exec_module(_mod)
else:
    _mod = sys.modules["_backend_models_module"]

for _attr in dir(_mod):
    if not _attr.startswith("_"):
        globals()[_attr] = getattr(_mod, _attr)

# UserProfile alias for Milestone 1 backwards compatibility
try:
    from app.models.profile import UserProfile
except ImportError:
    pass
